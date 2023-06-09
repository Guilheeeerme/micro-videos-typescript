import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-case";
import { CategoryOutputMapper } from "../dto/category-output";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../../../@seedwork/application/dto/pagination-output";
import { SearchInputDto } from "../../../@seedwork/application/dto/search-input";

export namespace ListCategoriesUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) {}
  
    async execute(input: Input): Promise<Output> {
      const params = new CategoryRepository.SearchParams(input);
      const searchResult = await this.categoryRepo.search(params);
  
      return this.toOutput(searchResult);
    }
  
    private toOutput(searchResult: CategoryRepository.SearchResult): Output {
      const items = searchResult.items.map((i) => {
        return CategoryOutputMapper.toOutput(i);
      });
      const pagination = PaginationOutputMapper.toOutput(searchResult);
  
      return {
        items,
        ...pagination,
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<CategoryOutput>;
}

export default ListCategoriesUseCase;


