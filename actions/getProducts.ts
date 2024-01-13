import prisma from '@/libs/prismadb'

export type IProductParams ={
    category?: string | null
    searchTerm?: string | null
}

export default async  function getProducts (params: IProductParams) {
    try {
        const { category, searchTerm } = params
        let searchString = searchTerm

        if (!searchTerm) {
            searchString = ''
        }

        let query: any = {}

        if (category) {
            query.category = category
        }

        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contain: searchString,
                            mode: 'insensitive'
                        },
                        description: {
                            contain: searchString,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdDate: 'desc'
                    }
                }
            }
        })

        return products

    } catch (error: any) {
        throw new Error(error)
    }
}