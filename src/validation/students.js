import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': ' Має бути текстом',
    'string.min': ' Має містити щонайменше 3 символи',
    'string.max': ' Має містити не більше 20 символів',
    'any.required': ' Є обовʼязковим полем',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[\d\+\-\(\)\s]+$/)
    .min(3)
    .max(16)
    .required()
    .messages({
      'string.pattern.base':
        ' Має містити лише цифри, пробіли, дужки, плюс або мінус',
      'string.min': ' Має містити щонайменше 3 символи',
      'string.max': ' Має містити не більше 16 символів',
      'any.required': 'Є обовʼязковим полем',
    }),
  email: Joi.string().email().min(3).max(40).required().messages({
    'string.email': ' Має бути валідною електронною адресою',
    'string.min': ' Має містити щонайменше 3 символи',
    'string.max': ' Має містити не більше 40 символів',
    'any.required': ' Є обовʼязковим полем',
  }),
  isFavourite: Joi.boolean().default(false).messages({
    'boolean.base': ' Має бути булевим значенням (true/false)',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': ' Має бути одним із: work, home, personal',
      'any.required': ' Є обовʼязковим полем',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': ' Має бути текстом',
    'string.min': ' Має містити щонайменше 3 символи',
    'string.max': ' Має містити не більше 20 символів',
  }),
  phoneNumber: Joi.string().min(3).max(16).messages({
    'string.min': ' Має містити щонайменше 3 символи',
    'string.max': ' Має містити не більше 16 символів',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Має бути валідною електронною адресою',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Має бути булевим значенням (true/false)',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Має бути одним із: work, home, personal',
  }),
});
