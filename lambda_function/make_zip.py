import os
import zipfile

include_dirs = [
    'node_modules'
]
include_extensions = [
    '.js',
    '.json'
]
include_files = [

]

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file))

if __name__ == '__main__':
    with zipfile.ZipFile('lambda_function.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
        for folder in include_dirs:
            zipdir(folder, zipf)
        for ext in include_extensions:
            [zipf.write(x) for x in os.listdir() if x.endswith(ext)]
        for f in include_files:
            zipf.write(f)
        
