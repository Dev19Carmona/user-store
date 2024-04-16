interface PaginationResponseDataInterface {
  page: number
  limit: number
  total: number
  endpoint: string
}

export class PaginationResponseDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly total: number,
    public readonly next: string | null,
    public readonly prev: string | null
  ) {}
  static create(
    props: PaginationResponseDataInterface
  ): [string?, PaginationResponseDto?] {
    const { page, limit, total, endpoint } = props

    if (isNaN(page) || isNaN(limit) || isNaN(total))
      return ['Page and limit must be numbers']
    if (page <= 0 || limit <= 0 || total <= 0)
      return ['Page, total and limit must be greater than 0']
    if (!endpoint) return ['Endpoint is Required']
    
    const limitPages = total - page * limit
    const next =
      limitPages > 0 ? `/api/${endpoint}?page=${page + 1}&limit=${limit}` : null
    const prev =
      page - 1 > 0 ? `/api/${endpoint}?page=${page - 1}&limit=${limit}` : null
    
    if (isNaN(page) || isNaN(limit)) return ['Page and limit must be numbers']
    if (page <= 0 || limit <= 0)
      return ['Page and limit must be greater than 0']

    return [
      undefined,
      new PaginationResponseDto(page, limit, total, next, prev),
    ]
  }
}
