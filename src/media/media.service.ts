import { Injectable } from '@nestjs/common';
import { media } from '../interfaces/media.interface';

@Injectable()
export class MediaService {

    private medias: media[] = [
        {
            id: 1, 
            url: "https://docs.nestjs.com/controllers#routing",
            article_id: 2,
            hero: true,
            type: 1,
        },
        {
            id: 2, 
            url: "https://docs.nestjs.com/controllers#routing",
            article_id: 3,
            hero: false,
            type: 2,
        }
    ];

    private currentId = 3;

    //Récupération de tous les medias
    findAll() {
        return this.medias;
    }

    //Récupération d'un media
    findOne(_id: number) {
        return this.medias.find((medias) => medias.id === _id);
    }

    //Création d'un nouveau media
    create(media: { url: string; article_id: number ; hero: boolean; type: number;}) {
        const newMedia = { id: this.currentId++, ...media }; // Ajout d'un ID unique
        this.medias.push(newMedia);
        return newMedia;
    }

    //Suppresion d'un media
    delete(id: number) {
        const mediaIndex = this.medias.findIndex((media) => media.id === id);
        if (mediaIndex === -1) {
            return { error: `Media with ID ${id} not found` };
        }
    
        const deletedMedia = this.medias.splice(mediaIndex, 1);
        return deletedMedia[0];
    }

    //Modification d'un media
    update(id: number, updatedMedia: Partial<{ url: string; article_id: number; hero: boolean; type: number; }>) {
        const mediaIndex = this.medias.findIndex((media) => media.id === id);
        if (mediaIndex === -1) {
            return { error: `Media with ID ${id} not found` };
        }
    
        this.medias[mediaIndex] = { ...this.medias[mediaIndex], ...updatedMedia };
        return this.medias[mediaIndex];
    }
}
