#!/usr/bin/env python3
"""Log parsing"""
import sys


def print_stats(total_size, status_codes):
    """Print the accumulated statistics."""
    print("File size: {}".format(total_size))
    for code in sorted(status_codes.keys()):
        if status_codes[code] > 0:
            print("{}: {}".format(code, status_codes[code]))


# Initialize variables to store the total file size and count of status codes
total_size = 0
status_codes = {200: 0, 301: 0, 400: 0, 401: 0, 403: 0, 404: 0, 405: 0, 500: 0}
line_count = 0

try:
    for line in sys.stdin:
        try:
            parts = line.split()
            # Ensure the format is correct
            if len(parts) < 7:
                continue

            # Extract and accumulate file size
            file_size = int(parts[-1])
            total_size += file_size

            # Extract and count status code
            status_code = int(parts[-2])
            if status_code in status_codes:
                status_codes[status_code] += 1

            line_count += 1

            # Print stats every 10 lines
            if line_count % 10 == 0:
                print_stats(total_size, status_codes)

        except (ValueError, IndexError):
            continue

    # Print final stats after reading all lines
    print_stats(total_size, status_codes)

except KeyboardInterrupt:
    # Print stats upon keyboard interruption
    print_stats(total_size, status_codes)
    raise
