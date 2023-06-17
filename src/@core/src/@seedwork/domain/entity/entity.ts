// import { ValueObject } from "../value-objects/value-object";

// export abstract class Entity<
//   EntityId extends ValueObject = any,
//   Props = any,
//   JsonProps = Required<{ id: string } & Props>
// > {
//   constructor(
//     public readonly props: Props,
//     public readonly entityId: EntityId
//   ) {}

//   get id(): string {
//     return this.entityId.value;
//   }

//   // equals(obj: this): boolean {
//   //   return this.id === obj.id;
//   // }

//   abstract toJSON(): JsonProps;
// }

// export default Entity;
// //entity para object

import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export abstract class Entity<Props = any> {
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId();
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}

export default Entity;
