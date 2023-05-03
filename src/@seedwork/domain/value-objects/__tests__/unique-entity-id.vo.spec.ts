import InvalidUuidError from "../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

describe("UniqueEntityId Unit Tests", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

  test("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  test("should accept a uuid passed in constructor", () => {
    const uuid = "1032793a-49fc-4d5d-938d-baf5f9e78e21";
    const valueObject = new UniqueEntityId(uuid);
    expect(valueObject.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  test("should accept a uuid passed in constructor", () => {
    const valueObject = new UniqueEntityId();
    expect(uuidValidate(valueObject.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
