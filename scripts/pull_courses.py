"""Generate a SQL script that inserts all courses into the database."""

import json
import logging
import requests

FILENAME = "db-procs/02-insert-courses.sql"
COURSEDOG_URL = "https://app.coursedog.com/api/v1/cm/cty01/courses/search/$filters"
CATALOG_ID = "tZiZukp65EP1Gixjt6qf"

logger = logging.getLogger(__name__)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    logger.info("Using file=%s", FILENAME)

    total_count = 0

    with open(FILENAME, "w") as f:
        f.write("INSERT INTO courses (code, title, description) VALUES\n")

    while "bruh":
        logger.info("Requesting skip=%s, limit=%s", total_count, 1000)
        req = requests.post(
            COURSEDOG_URL,
            params={
                "catalog_id": CATALOG_ID,
                "isActive": "true",
                "skip": total_count,
                "limit": 1000,
                "orderBy": "code",
                "columns": "code,longName,description",
            },
        )

        resp = req.json()
        courses = resp["data"]

        with open(FILENAME, "a") as f:
            for i, course in enumerate(courses):
                code = course["code"]
                title = course["longName"].replace("'", "''")
                description = course["description"].replace("'", "''")

                f.write(f"('{code}','{title}','{description}'),\n")

        total_count += len(courses)
        if total_count >= resp["listLength"]:
            break
