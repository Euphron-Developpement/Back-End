import { Injectable } from '@nestjs/common';


@Injectable()
export class TagsService {
    private tags = [{id: 1, label: "xx", icon: "aa", color: "#ffedjf"},];
    private currentId = 1;

    findAll() {
        return this.tags;
    }

    findOne(id: number) {
        return this.tags.find((tag) => tag.id === id);
    }

    create(tag: { label: string; icon: string ; color: string }) {
        const newTag = { id: this.currentId++, ...tag }; // Ajout d'un ID unique
        this.tags.push(newTag);
        return newTag;
    }

    update(id: number, updatedTag: Partial<{ label: string; icon: string ; color: string }>) {
        const tagIndex = this.tags.findIndex((tag) => tag.id === id);
        if (tagIndex === -1) {
            return { error: `tag with ID ${id} not found` };
        }
    
        this.tags[tagIndex] = { ...this.tags[tagIndex], ...updatedTag };
        return this.tags[tagIndex];
    }

    delete(id: number) {
        const tagIndex = this.tags.findIndex((tag) => tag.id === id);
        if (tagIndex === -1) {
            return { error: `tag with ID ${id} not found` };
        }
    
        const deletedTag = this.tags.splice(tagIndex, 1);
        return deletedTag[0];
    }
      

}
