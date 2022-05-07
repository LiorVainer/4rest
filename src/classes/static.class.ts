import ForestInstance, { InstanceConfig } from "./instance.class";

export class ForestStatic {
  create(config?: InstanceConfig): ForestInstance {
    const forestInstance = new ForestInstance(config);

    return forestInstance;
  }
}
