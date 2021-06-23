import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {
    async execute(name: string) {
        const tagsRepositories = getCustomRepository(TagsRepositories);

        if (!name) {
            throw new Error("Please, provide us a tag name.");
        }

        const tagAlreadyExists = await tagsRepositories.findOne({ name })
        if (tagAlreadyExists) {
            throw new Error("This tag name already exists. Please, choose another.")
        }

        const tag = tagsRepositories.create({ name })
        await tagsRepositories.save(tag)
        return tag
    }
}

export { CreateTagService };    