import { PaginateModel, Document, Schema, model } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

interface Test extends Document {
  _id: string;
  test: string;
}

const TestSchema: Schema = new Schema({
  // _id: Schema.Types.ObjectId, // MongoDB autogenerates this
  test: String,
});
TestSchema.plugin(mongoosePaginate);

interface TestModel<T extends Document> extends PaginateModel<T> {}

export var TestModel: TestModel<Test> = model<Test>('Test', TestSchema);

// Error message:
// Type 'PassportLocalModel<Test>' is not assignable to type 'TestModel<Test>'.
//   Property 'paginate' is missing in type 'PassportLocalModel<Test>'.