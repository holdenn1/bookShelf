import * as yup from "yup";

export default [
  yup.object().shape({title: yup.string().required('Title is required field')}),
  yup.object().shape({description: yup.string().required('Description is required field')}),
  yup.object().shape({cover: yup.string().required('Cover is required field')})
]