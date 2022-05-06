import ForestInstance, { InstanceConfig } from "./instance";

export class ForestStatic {
  create(config?: InstanceConfig): ForestInstance {
    const forestInstance = new ForestInstance(config);

    return forestInstance;
  }
}
