import { Category, CategoryId } from "../../domain/entities/category";
import { InMemorySearchableRepository } from "../../../@seedwork/domain/repository/in-memory.repository";
import CategoryRepository from "category/domain/repository/category.repository";
import { SortDirection } from "@seedwork/domain/repository/repository-contracts";

export default class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category, any>
  implements CategoryRepository.Repository
{
  search(
    props: CategoryRepository.SearchParams
  ): Promise<CategoryRepository.SearchResult> {
    throw new Error("Method not implemented.");
  }
  insert(entity: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }
  bulkInsert(entities: Category[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string | CategoryId): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }
  update(entity: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | CategoryId): Promise<void> {
    throw new Error("Method not implemented.");
  }

  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
}
