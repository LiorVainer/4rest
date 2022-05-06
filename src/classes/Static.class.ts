import ForestInstance, { InstanceConfig } from "./Instance.class";

export class ForestStatic {
  create(config?: InstanceConfig): ForestInstance {
    const forestInstance = new ForestInstance(config);

    return forestInstance;
  }
}
