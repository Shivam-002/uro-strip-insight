import cv2
import numpy as np

from models.response import SuccessResponse, FailureResponse
from exceptions.FailureException import FailureException
from utils import ErrorCode


def detect_horizontal_lines(image):
    # Convert image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply adaptive thresholding to extract lines
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Filter contours based on aspect ratio and area to detect horizontal lines
    lines = []
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        aspect_ratio = w / float(h)
        area = cv2.contourArea(contour)

        if aspect_ratio < 0.1 and area > 10000:
            print("Aspect ratio:", aspect_ratio, "Area:", area)
            lines.append((x, y, w, h))

    if len(lines) > 1:
        # Throw an FailureResponse Error
        raise FailureException(
            ErrorCode.SERVER_ERROR,
            "Unable to process the Image!",
            ["Multiple lines detected in the image"],
        )

    if len(lines) == 0:
        # Throw an FailureResponse Error
        raise FailureException(
            ErrorCode.SERVER_ERROR,
            "Unable to process the Image!",
            ["No lines detected in the image"],
        )

    # Crop the image based on the detected lines
    for line in lines:
        x, y, w, h = line
        cropped_image = image[y : y + h, x : x + w]

    # Display the image with detected lines
    return cropped_image


async def convert_to_image(file):
    # Read the contents of the file into a bytes-like object
    contents = await file.read()

    # Step 2: Convert the file content to a NumPy array
    nparr = np.frombuffer(contents, np.uint8)

    # Step 3: Decode the image using OpenCV
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    return img


async def get_test_results(file, estimated_height=90, padding=25):
    image = await convert_to_image(file)

    image = detect_horizontal_lines(image)
    # Get the height and width of the image
    height, width, _ = image.shape

    # Initialize an array to hold the RGB values
    rgb_values = []

    # Loop to cut the image and get the center RGB value of each segment
    for i in range(10):
        # Define the segment boundaries
        start_y = padding + i * estimated_height
        end_y = (
            start_y + estimated_height
            if start_y + estimated_height <= height
            else height
        )

        # Extract the segment
        segment = image[start_y:end_y, :]

        # Check if the segment height is valid
        if segment.shape[0] == 0:
            break

        # Find the center of the segment
        center_x = width // 2
        center_y = (end_y + start_y) // 2

        # Get the RGB value of the center pixel
        center_rgb = segment[center_y - start_y, center_x].tolist()

        # Draw the segment boundaries
        # cv2.line(image, (0, start_y), (width, start_y), (0, 255, 0), 2)
        # cv2.line(image, (0, end_y), (width, end_y), (0, 255, 0), 2)

        # Add the RGB value to the array
        rgb_values.append(center_rgb)

    # Create a dictionary with the specific keys and the RGB values
    result = {
        "URO": rgb_values[0],
        "BIL": rgb_values[1],
        "KET": rgb_values[2],
        "BLD": rgb_values[3],
        "PRO": rgb_values[4],
        "NIT": rgb_values[5],
        "LEU": rgb_values[6],
        "GLU": rgb_values[7],
        "SG": rgb_values[8],
        "PH": rgb_values[9],
    }
    return result
