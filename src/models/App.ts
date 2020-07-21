import { prop, getModelForClass } from '@typegoose/typegoose';

export class App {
  @prop()
  name!: string;
}

export default getModelForClass(App);
