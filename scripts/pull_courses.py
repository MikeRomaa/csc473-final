"""Generate a SQL script that inserts all courses into the database."""

import json
import logging
import requests
from pathlib import Path

COURSEDOG_URL = "https://app.coursedog.com/api/v1/cm/cty01/courses/search/$filters"
CATALOG_ID = "tZiZukp65EP1Gixjt6qf"

logger = logging.getLogger(__name__)


def _get_courses() -> dict[str, tuple[str, str]]:
    # Mapping of course code to (title, description)
    courses: dict[str, tuple[str, str]] = {}
    total_count = 0

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

        for course in resp["data"]:
            code = course["code"]
            title = course["longName"].replace("'", "''")
            description = course["description"].replace("'", "''")

            courses[code] = (title, description)

        total_count += len(courses)
        if total_count >= resp["listLength"]:
            break

    return courses


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)

    courses = _get_courses()

    sql = "INSERT IGNORE INTO course (code, title, description) VALUES\n" + ",\n".join(
        f"('{code}','{details[0]}','{details[1]}')" for code, details in courses.items()
    )

    path = Path(__file__).parent.parent / "db-procs" / "02-insert-courses.sql"
    logger.info("Using file=%s", path)

    with path.open("w") as f:
        f.write(sql)
