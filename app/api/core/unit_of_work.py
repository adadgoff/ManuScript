class IUnitOfWork:
    def __init__(self):
        pass

    async def __aenter__(self):
        pass

    async def __aexit__(self):
        pass

    async def commit(self):
        pass

    async def rollback(self):
        pass
