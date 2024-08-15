import os

def rename_files():
    folder_path = os.path.dirname(os.path.abspath(__file__))
    files = os.listdir(folder_path)
    files = [f for f in files if os.path.isfile(os.path.join(folder_path, f))]
    
    for i, filename in enumerate(files, start=1):
        extension = os.path.splitext(filename)[1]
        new_name = f"img-{i}{extension}"
        old_file = os.path.join(folder_path, filename)
        new_file = os.path.join(folder_path, new_name)
        os.rename(old_file, new_file)

rename_files()
