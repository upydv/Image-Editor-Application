import cv2
import os
import sys
import requests
import numpy as np

def download_image_from_url(url):
    """
    Downloads an image from a URL and returns it as a numpy array.
    """
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()  # Raise HTTPError for bad responses
        image_data = np.asarray(bytearray(response.content), dtype="uint8")
        image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
        return image
    except requests.exceptions.RequestException as e:
        print(f"Error: Unable to fetch image from URL: {e}")
        sys.exit(1)

def resize_image(image, width, height):
    """
    Resizes the given image to the specified width and height.
    """
    return cv2.resize(image, (width, height))

def save_image(output_dir, image, name):
    """
    Saves the image to the specified directory with the given name.
    """
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, name)
    cv2.imwrite(output_path, image)
    return output_path

if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Error: Please provide a feature, width, height, and image URL or path.")
        sys.exit(1)

    # Parse arguments
    feature = sys.argv[1]
    try:
        width = int(sys.argv[2])
        height = int(sys.argv[3])
    except ValueError:
        print("Error: Width and height must be integers.")
        sys.exit(1)

    filename = sys.argv[4]

    # Validate the feature
    if feature != "resize":
        print("Error: This script only supports the 'resize' feature.")
        sys.exit(1)

    # Load image from URL or local path
    if filename.startswith("http"):
        image = download_image_from_url(filename)
    else:
        print(f"Loading image from file: {filename}")
        image = cv2.imread(filename)
        if image is None:
            print(f"Error: Could not load image from '{filename}'.")
            sys.exit(1)

    # Resize image
    try:
        resized_image = resize_image(image, width, height)
        output_path = save_image("Resized_images", resized_image, f"resized_{os.path.basename(filename)}")
        print(f"Resized image saved as '{output_path}'")
    except Exception as e:
        print(f"Error during resizing or saving: {e}")
        sys.exit(1)
