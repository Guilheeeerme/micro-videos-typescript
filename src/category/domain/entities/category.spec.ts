import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";

describe("Category Unit Tests", () => {
  beforeEach(() => {
    Category.validate = jest.fn();
  });

  test("Constructor of category", () => {
    let category = new Category({ name: "Movie" });
    let props = omit(category.props, "created_at");
    expect(Category.validate).toHaveBeenCalled();
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });
  });

  test("id prop", () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };
    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id);
      expect(category.id).not.toBeNull();
    });
    // let category = new Category({ name: "Movie" });

    // expect(category.id).not.toBeNull();
    // expect(uuidValidate(category.id)).toBeTruthy();

    // category = new Category({ name: "Movie" }, null);
    // expect(category.id).not.toBeNull();
    // expect(uuidValidate(category.id)).toBeTruthy();

    // category = new Category({ name: "Movie" }, undefined);
    // expect(category.id).not.toBeNull();
    // expect(uuidValidate(category.id)).toBeTruthy();

    // category = new Category(
    //   { name: "Movie" },
    //   "f3680981-ec6f-4d8a-9c79-e0c4d20e6f8b"
    // );
    // expect(category.id).not.toBeNull();
    // expect(uuidValidate(category.id)).toBeTruthy();
  });

  test("getter and setter of name prop", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");

    category["name"] = "Interestelar";
    expect(category.name).toBe("Interestelar");
  });

  test("getter and setter of description prop", () => {
    let category = new Category({ name: "Movie" });

    expect(category.description).toBeNull();

    category = new Category({ name: "Movie", description: "some description" });
    expect(category.description).toBe("some description");

    category = new Category({ name: "Movie" });

    category["description"] = "other description";
    expect(category.description).toBe("other description");

    category["description"] = undefined;
    expect(category.description).toBeNull();

    category["description"] = null;
    expect(category.description).toBeNull();
  });

  test("getter and setter of is_active prop", () => {
    let category = new Category({ name: "Movie" });

    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: true });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy();

    category["is_active"] = true;
    expect(category.is_active).toBeTruthy();

    category["is_active"] = undefined;
    expect(category.is_active).toBeTruthy();
  });

  test("getter of created_at prop", () => {
    let category = new Category({ name: "Movie" });

    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({ name: "Movie", created_at });
    expect(category.created_at).toBe(created_at);
  });

  test("should update name and description of a category", () => {
    const category = new Category({
      name: "Movie",
      description: "some description",
    });

    category.update("Other movie", "Other description");

    expect(Category.validate).toHaveBeenCalledTimes(2);
    expect(category.name).toBe("Other movie");
    expect(category.description).toBe("Other description");
  });

  test("should activate a category", () => {
    const category = new Category({ name: "Movie", is_active: false });

    category.activate();

    expect(category.is_active).toBeTruthy();
  });

  test("should deactivate a category", () => {
    const category = new Category({ name: "Movie", is_active: true });

    category.deactivate();

    expect(category.is_active).toBeFalsy();
  });
});
