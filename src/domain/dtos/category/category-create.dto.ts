
export class CategoryCreateDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean
  ) {}
  static create(object: { [key: string]: any }): [string?, CategoryCreateDto?] {
    const { name, available = false } = object
    let availableBoolean = available
    if (!name) return ['Missing name']
    if (typeof available !== 'boolean') {
      availableBoolean = available === 'true' ? true : false
    }
    return [undefined, new CategoryCreateDto(name, availableBoolean)]
  }
}
