import Joi from "joi";



const addFundraiserSchema = Joi.object({
    fundraiser_name: Joi.string().required(),
    overall_rating: Joi.string().required(),
    reviewer_name: Joi.string().required(),
    reviewer_email: Joi.string().email().required(),
    description: Joi.string(),
    reviewer_date: Joi.string()
})

export default addFundraiserSchema;
