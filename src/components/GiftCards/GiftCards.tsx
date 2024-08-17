import { useState } from "react";
import Header from "../Header/Header"
import Drawer from "../Drawer";
import Cart from "../minicart/Cart";
import { Product } from "@/types";
import logo from "@/assets/images/img-5.webp";
import { Button, Divider, Form, Grid, GridColumn, GridRow, Icon, Input as Inputs, TextArea } from "semantic-ui-react";

export const GiftCards = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [amountGiftCard, setAmountGiftCard] = useState<string>('');
  const [designGiftCard, setDesignGiftCard] = useState<string>('');
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

  const handleSelectPrice = (price: string) => {
    if (price) {
      setAmountGiftCard(price);
    }
  }

  const handleCartIconClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleDesign = (img: string) => {
    setDesignGiftCard(img);
  }

  const priceCard = (price: string) => {
    return (
      <div 
        className={`flex justify-center items-center h-28 w-full bg-white rounded-lg cursor-pointer 
        ${amountGiftCard === price ? 'outline outline-[#0071e3] outline-[2px]' : 'border-[#86868b] border-[1px]'}`}
        onClick={()=> handleSelectPrice(price)}> 
        <span className="font-semibold text-2xl">{price}</span>
      </div>
    )
  }

  const DesignCard = ({img}: {img: string}) => (
    <div 
        className={`flex justify-center items-center h-28 w-full bg-white rounded-lg cursor-pointer px-3 py-5 
        ${designGiftCard === img ? 'outline outline-[#0071e3] outline-[2px]' : 'border-[#86868b] border-[1px]'}`}
        onClick={()=> handleDesign(img)}> 
        <img className="w-full h-full object-fill" src={img}/>
      </div>
  )


  return (
    <>
      <Header onCartIconClick={handleCartIconClick} products={products} />
        <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
          <Cart similar={'1234'} />
        </Drawer>
        
        <div className="max-w-[80%] mx-auto mt-16 pb-40 rounded-lg">
          <div className="flex justify-between w-full">
            
            <div className="w-[50%]">
              <img src={logo} alt="bombon" className="w-full h-[500px] object-contain sticky top-36" />
            </div>
            <Form className="w-[40%]">
            <div className="w-full pl-6">
              <h2 className="text-5xl font-bold mb-2">Comprar gift Card</h2>
              <p className="text-gray-600 mb-4 text-[18px]">
                Úsala para comprar en el App Store, Apple TV, Apple Music, iTunes, Apple Arcade, la app Apple Store, apple.com y en las tiendas Apple Store.</p>
              <p className="font-semibold text-2xl">Envío rápido y sencillo por email.</p>

              <div className="mb-6 mt-6">
                <div 
                  className={`flex justify-center items-center h-28 max-w-60 bg-white rounded-lg cursor-pointer border-[#0071e3] border-[2px]`}
                  > 
                  <span className="font-semibold text-2xl">Email</span>
                </div>
              </div>

              <Divider />

                <p className="font-semibold text-2xl">Elige un diseño.</p>
                <Grid columns={2}>
                  <GridRow>
                    <GridColumn>
                      <div className="mb-6 mt-6">
                      <DesignCard  img="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" /> 
                      </div>
                    </GridColumn>
                    <GridColumn>
                      <div className="mb-6 mt-6">

                      <DesignCard  img="algo" /> 
                      </div>
                    </GridColumn>
                  </GridRow>
                </Grid>
              <Divider />

              <p className="font-semibold text-2xl">Elige un importe.</p>
              <Grid columns={2}>
                <GridRow >
                  <GridColumn>
                    <div className="mb-6 mt-6">
                    {priceCard('50$')}

                    </div>
                  </GridColumn>
                  <GridColumn>
                    <div className="mb-6 mt-6">

                    {priceCard('100$')}
                    </div>
                  </GridColumn>
                </GridRow>
              </Grid>
              <Divider />

              <h3 className="font-semibold mb-6 text-2xl">Indica tus datos de envio</h3>
              <div className="flex flex-col">
                <p className="font-semibold text-[1.125rem] mb-4">¿Para quién es?</p>
                <Inputs placeholder="Nombre del destinatario" size="big" className="mb-2 border-gray-800" focus={true} />
                <Inputs placeholder="Email del destinatario" size="big" className="mb-2 rounded-lg" focus={true} icon={<Icon name="mail" size="large" />}/>
                <p className="font-semibold text-[1.125rem] mb-4 mt-6">¿Quien la envía?</p>
                <Inputs placeholder="Nombre del remitente" size="big" className="mb-2 " focus={true} />
                <Inputs placeholder="Email del remitente" size="big" className="mb-2 " focus={true} icon={<Icon name="mail" size="large" />}/>

              <Divider />

              <p className="font-semibold mb-2 text-2xl">¿Quieres añadir un mensaje personalizado?</p>

                  <TextArea rows={4} placeholder="Escribe aquí tu mensaje" size="big" style={{marginBottom: '15px', marginTop: '24px', fontSize: "18px"}} />

                  <div className="pt-[30px] pr-[30px] pl-[30px] pb-[12px] bg-[#fafafc] rounded-md">
                    <div>
                      <p className="text-4xl font-semibold leading-none">50$</p>
                    </div>
                    
                    <Divider />

                    <div className="flex items-center pt-5 pb-7">
                        <Icon  name="mail" size="large" />
                        <p className="text-lg ml-3">
                        Suele llegar dentro de una hora.</p>

                    </div>

                    <div>
                      <Button className="w-full mt-10" color="blue" size="big">
                        Añadir a la bolsa</Button>
                    </div>

                  </div>

              </div>
            </div>
            </Form>
          </div>
        </div>
    </>
  )
}
