import cv2
import numpy as np
import requests
import sys
import os
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from PIL import Image

def load_image_from_url(url):
    last_segment = url.split('/')[-1]  # Extract the last part of the URL
    response = requests.get(url)
    if response.status_code == 200:
        image_data = np.asarray(bytearray(response.content), dtype="uint8")
        image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
        # Save the image to a temporary file
        temp_image_path = f"/tmp/{last_segment}"
        cv2.imwrite(temp_image_path, image)
        return temp_image_path, last_segment
    else:
        print("Error: Unable to fetch image from URL")
        sys.exit(1)

def image_to_pdf(image_path, last_segment):
    # Open the image file using PIL to get dimensions
    image = Image.open(image_path)
    
    # Get the dimensions of the image
    width, height = image.size
    
    # Create a directory to save the PDF output
    output_dir = "Converted_PDFs"
    os.makedirs(output_dir, exist_ok=True)
    
    # Create a canvas to generate the PDF (letter page size is 8.5 x 11 inches)
    c = canvas.Canvas(os.path.join(output_dir, f"converted_{last_segment}.pdf"), pagesize=letter)
    
    # Letter page size dimensions (in points: 1 inch = 72 points)
    letter_width, letter_height = letter
    
    # Calculate the scaling factor to fit the image to the page while maintaining aspect ratio
    scale_factor = min(letter_width / width, letter_height / height)
    
    # Apply the scaling factor to get the new dimensions
    new_width = width * scale_factor
    new_height = height * scale_factor
    
    # Calculate the x and y offsets to center the image on the page
    x_offset = (letter_width - new_width) / 2
    y_offset = (letter_height - new_height) / 2
    
    # Draw the image on the PDF at the calculated position and size
    c.drawImage(image_path, x_offset, y_offset, new_width, new_height)
    
    # Save the canvas as a PDF
    c.save()
    
    print(f"PDF saved as 'converted_{last_segment}.pdf' in '{output_dir}' directory.")

# Get the filename argument
filename = sys.argv[1]

# Check if filename is a URL or local path
if filename.startswith("http"):
    image_path, last_segment = load_image_from_url(filename)
else:
    image_path = filename
    last_segment = os.path.basename(filename)

# Check if the image was successfully loaded
if not os.path.exists(image_path):
    print("Error: Could not load image.")
    sys.exit(1)

# Convert the image to a PDF
image_to_pdf(image_path, last_segment)
