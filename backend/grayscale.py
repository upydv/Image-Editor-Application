import cv2
import numpy as np
import requests
import sys
import os

def load_image_from_url(url):
    last_segment = url.split('/')[-1]  # Extract the last part of the URL
    response = requests.get(url)
    if response.status_code == 200:
        image_data = np.asarray(bytearray(response.content), dtype="uint8")
        image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
        return image, last_segment
    else:
        print("Error: Unable to fetch image from URL")
        sys.exit(1)

# Get the filename argument
filename = sys.argv[1]

# Check if filename is a URL or local path
if filename.startswith("http"):
    image, last_segment = load_image_from_url(filename)
else:
    image = cv2.imread(filename)
    last_segment = os.path.basename(filename)

# Check if the image was successfully loaded
if image is None:
    print("Error: Could not load image.")
    sys.exit(1)

# Convert the image to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)


# Ensure the "output_images" directory exists
output_dir = "Gray_Scale"
os.makedirs(output_dir, exist_ok=True)

# Save the black-and-white image
gs_output_path = os.path.join(output_dir, f"Grayscale_{last_segment}")
cv2.imwrite(gs_output_path, gray_image)
print(f"Gray Scale image saved as '{gs_output_path}'")