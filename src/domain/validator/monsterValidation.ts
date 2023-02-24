import { object, string, number, array } from 'yup';

export const monsterValidation = async (data) =>{
  const schemaRule = object({
    name: string().required(),
    category: string().required(),
    stats: object().shape({
      hp: number().required().max(500),
      attack: number().required().max(500),
      def: number().required().max(500),
      speed: number().required().max(500)
    }),
    types:array().required('Pick at least 1 Type')
  });

  const validate = await schemaRule.validate(data);
  return validate
}
