import asyncio
import os
import sys

from src.app.utils.test_db import create_tables, insert_data

sys.path.insert(1, os.path.join(sys.path[0], '..'))


async def main():
    await create_tables()
    await insert_data()


if __name__ == '__main__':
    asyncio.run(main())
