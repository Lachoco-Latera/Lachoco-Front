
import { useEffect, useRef, useState } from "react";
import Header from "../Header/Header"
import Drawer from "../Drawer";
import Cart from "../minicart/Cart";
import { Product } from "@/types";
import { Button, Divider, Form, Grid, GridColumn, GridRow, Icon, Input as Inputs, TextArea } from "semantic-ui-react";
import { useCartStore } from "@/stores/useCartStore";
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Footer } from "../Footer/Footer";
import { createGiftCard } from "@/module/gift-card";
import { useUser } from "@clerk/clerk-react";
import { getUser } from "@/module/users";

type FormData = {
  designCard?: string;
  amountCard?: string;
  nameRecipient: string;
  emailRecipient: string;
  nameSender: string;
  emailSender: string;
  message?: string;
}

const defaultDesignGiftCard = import.meta.env.VITE_DESIGN_GIFT_CARD;

export const GiftCards = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [amountGiftCard, setAmountGiftCard] = useState<string>('');
  const [designGiftCard, setDesignGiftCard] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const { t } = useTranslation()
  const { user } = useUser()
  const userFetchedRef = useRef(false);

  const addGiftCard = useCartStore((state) => state.addGiftCard);

  const products: Product[] = [ 
    {
      id: "1",
      name: "Product 1",
      presentacion: 0,
      description: "Descripción del producto 1",
      quantity: 1,
      category: {
        id: "1",
        name: "Category 1",
        icon: 1,
      },
      price: "100",
      currency: "USD",
      label: "Nuevo",
      isActive: true,
      flavors: [
        {
          id: "1",
          name: "Flavor 1",
          stock: 1,
        },
        {
          id: "2",
          name: "Flavor 2",
          stock: 1,
        },
      ],
      images: [
        {
          id: "1",
          img: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
          https: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        },
        {
          id: "2",
          img: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
          https: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        },
      ],
    }
  ]

  const schema = yup
    .object({
      designCard: yup.string(),
      amountCard: yup.string(),
      nameRecipient: yup.string().required(),
      emailRecipient: yup.string().email(t("enter_a_valid_email_format")).required(t("recipient_email_is_required")),
      nameSender: yup.string().required(),
      emailSender: yup.string().email(t("enter_a_valid_email_format")).required(t("sender_email_is_required")),
      message: yup.string().optional(),
    }).required()

  const { register, handleSubmit, formState: { errors, isValid, isSubmitSuccessful }, reset } = useForm({ resolver: yupResolver(schema)});

    useEffect(() => {
      const fetchUserData = async () => {
        if (userFetchedRef.current || !user) return
        try {
          const response = await getUser()
          const userWithEmail = 
            response
            .data
            .find((userData: Record<string, string>)=> user?.primaryEmailAddress?.emailAddress === userData.email)
          setUserId(userWithEmail.id)
          userFetchedRef.current = true
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserData()
    }, [user])

  useEffect(() => {
    if (isSubmitSuccessful && isValid) {
      toast.success(t("added_to_cart"))
      reset()
      setAmountGiftCard('')
      setDesignGiftCard('')
    }
  },[isSubmitSuccessful, isValid])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const order = {
      userId: userId,
      designCard: designGiftCard,
      amountCard: amountGiftCard,
      nameRecipient: data.nameRecipient,
      emailRecipient: data.emailRecipient,
      nameSender: data.nameSender,
      emailSender: data.emailSender,
      message: data.message,
    }
    const response = await createGiftCard(order);
    console.log(response.data)
    if(response.status === 201) {
      addGiftCard({...order, id: response.data.gift.id});
    }
  }

  const handleSelectPrice = (price: string) => {
    if (price) {
      setAmountGiftCard(price);
    }
  }

  const handleDesign = async  (img: string) => {
    setDesignGiftCard(img);
  }
  
  const handleCartIconClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const priceCard = (price: string) => {
    return (
      <div 
        className={`flex justify-center items-center h-28 w-full bg-white rounded-lg cursor-pointer 
        ${amountGiftCard === price ? 'outline outline-[#0071e3] outline-[2px]' : 'border-[#a8a8ad] border-[1px]'}`}
        onClick={()=> handleSelectPrice(price)}> 
        <span className="font-semibold text-2xl">${Number(price).toLocaleString()}</span>
      </div>
    )
  }

  const DesignCard = ({img}: {img: string}) => {
    return (
    <div 
        className={`flex justify-center items-center h-36 w-full bg-white rounded-lg cursor-pointer px-3 py-4 
        ${designGiftCard === img ? 'outline outline-[#0071e3] outline-[2px]' : 'border-[#a8a8ad] border-[1px]'}`}
        onClick={()=> handleDesign(img)}> 
        <img className="w-full h-full object-cover rounded-lg" src={img}/>
      </div>
  )}

  const InputError = ({message}: {message: string}) => (
    <p className="text-lg text-red-600 dark:text-red-500">
      {message}
    </p>
  )

  return (
    <>
      <Header onCartIconClick={handleCartIconClick} products={products} />
        <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
          <Cart similar={'1234'} />
        </Drawer>
        
        <div className="max-w-[80%] md:w-full mx-auto mt-16 pb-40 rounded-lg">
          <div className="flex justify-between content-center w-full flex-col mx-auto md:flex-row">
            
            <div className="w-[80%] md:w-full mx-auto">
              <img src={designGiftCard || defaultDesignGiftCard} alt="gift-card" className="w-full h-[500px] object-contain sticky top-36" />
            </div>
            <Form className="w-[80%] md:w-full mx-auto" onSubmit={handleSubmit(onSubmit)} >
            <div className="w-full pl-6">
              <h2 className="text-5xl font-bold mb-2">{t("buy_gift_card")}</h2>
              <p className="text-gray-600 mb-4 text-[18px]">
                {t("description_to_buy")}</p>
              <p className="font-semibold text-2xl">{t("send_email_gift_card")}</p>

              <div className="mb-6 mt-6">
                <div 
                  className={`flex justify-center items-center h-28 max-w-60 bg-white rounded-lg cursor-pointer border-[#0071e3] border-[2px]`}
                  > 
                  <span className="font-semibold text-2xl">{t("email")}</span>
                </div>
              </div>

              <Divider />

                <p className="font-semibold text-2xl">{t("choose_design")}</p>
                <Grid columns={2}>
                  <GridRow>
                    <GridColumn>
                      <div className="mb-6 mt-6">
                      <DesignCard img='https://res.cloudinary.com/dine1x1iy/image/upload/v1724174932/uc1kbe1jufmj4gbv3f4x.png' /> 
                      </div>
                    </GridColumn>
                    <GridColumn>
                      <div className="mb-6 mt-6">
                      <DesignCard img='https://res.cloudinary.com/dine1x1iy/image/upload/v1724431015/antcp3okhfbkwm8jfcsu.png' /> 
                      </div>
                    </GridColumn>
                  </GridRow>
                </Grid>
              <Divider />

              <p className="font-semibold text-2xl">{t("choose_amount")}</p>
              <Grid columns={2}>
                <GridRow >
                  <GridColumn>
                    <div className="mb-6 mt-6">
                    {priceCard('20.000')}

                    </div>
                  </GridColumn>
                  <GridColumn>
                    <div className="mb-6 mt-6">

                    {priceCard('50.000')}
                    </div>
                  </GridColumn>
                  <GridColumn>
                    <div className="mb-6 mt-6">

                    {priceCard('70.000')}
                    </div>
                  </GridColumn>
                  <GridColumn>
                    <div className="mb-6 mt-6">

                    {priceCard('100.000')}
                    </div>
                  </GridColumn>
                </GridRow>
              </Grid>
              <Divider />

              <h3 className="font-semibold mb-6 text-2xl">{t("enter_your_shipping_information")}</h3>
              <div className="flex flex-col">
                <p className="font-semibold text-[1.125rem] mb-4">{t("who_is_it_for")}</p>

                <Inputs
                  placeholder={t("name_recipient")}
                  focus={true} 
                  size="big" 
                  disabled={!(amountGiftCard && designGiftCard)}
                  {...register("nameRecipient", { required: true})} 
                  error={errors.nameRecipient ? true : false} 
                />
                {errors.nameRecipient && <InputError message={t("recipient_name_is_required")} />}

                <Inputs
                  placeholder={t("email_recipient")}
                  size="big" 
                  className="mt-4" 
                  focus={true} 
                  icon={<Icon name="mail" size="large" />}
                  disabled={!(amountGiftCard && designGiftCard)}
                  {...register("emailRecipient", { required: true})} 
                  error={errors.emailRecipient ? true : false}
                  />
                {errors.emailRecipient && <InputError message={errors.emailRecipient.message || t("recipient_email_is_required")} />}

                <p className="font-semibold text-[1.125rem] mb-4 mt-6">{t("who_sends_it")}</p>
                <Inputs
                  placeholder={t("sender_name")}
                  size="big" 
                  focus={true}
                  disabled={!(amountGiftCard && designGiftCard)}
                  {...register("nameSender", { required: true})} 
                  error={errors.nameSender ? true : false}
                  />
                {errors.nameSender && <InputError message={t("sender_name_is_required")} />}

                <Inputs
                  placeholder={t("email_sender")}
                  size="big" className="mt-4" 
                  focus={true} 
                  icon={<Icon name="mail" size="large" />}
                  disabled={!(amountGiftCard && designGiftCard)}
                  {...register("emailSender", { required: true, })} 
                  error={errors.emailSender ? true : false}
                  />
                {errors.emailSender && <InputError message={errors.emailSender.message || t("sender_email_is_required")} />}

              <Divider />

              <p className="font-semibold mb-2 text-2xl">{t("do_you_want_to_add_a_message")}</p>

                  <TextArea 
                    rows={4} 
                    placeholder={t("write_your_message")}
                    size="big" style={{marginBottom: '15px', marginTop: '24px', fontSize: "18px"}}
                    {...register("message")}
                    disabled={!(amountGiftCard && designGiftCard)}
                  />

                  <div className="pt-[30px] pr-[30px] pl-[30px] pb-[12px] bg-[#fafafc] rounded-md">

                  {amountGiftCard && designGiftCard ? (
                    <div>
                      <p className="text-4xl font-semibold leading-none">${amountGiftCard}</p>
                    </div>
                    
                  ) : null}
                    
                    <Divider />

                    <div className="flex items-center pt-5 pb-7">
                        <Icon  name="mail" size="large" />
                        <p className="text-lg ml-3">
                        {t("usually_delivered_within_an_hour")}</p>

                    </div>

                    <div>
                      <Button type="submit" className="w-full mt-10" color="blue" size="big" disabled={!(amountGiftCard && designGiftCard)}>
                        {t("add_to_cart")}
                      </Button>
                    </div>

                  </div>

              </div>
            </div>
            </Form>
          </div>
        </div>
        <Footer/>
    </>
  )
}
