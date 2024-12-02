import { Controller, Get, Post, Param, Body, Delete, Patch, Query } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {};

    //Récupération de tous les medias
    @Get()
    findAll() {
        return this.mediaService.findAll();
    }

    //Récupération d'un media
    @Get(':id')
    findOne(@Param('id') _id: number) {
        return this.mediaService.findOne(+_id);
    }

    //Ajout d'un media
    @Post()
    create(@Body() media: { url: string; article_id: number; hero: boolean; type: number; }) {
        return this.mediaService.create(media);
    }

    //Modification d'un media
    @Patch()
    update(
        @Query('id') id: string,
        @Body() updatedMedia: { url?: string; article_id?: number; hero?: boolean; type?: number; }
    ) {
        return this.mediaService.update(+id, updatedMedia);
    }
    
    //Suppresion d'un media
    @Delete()
    delete(@Query('id') id: string) {
        return this.mediaService.delete(+id);
    }
}
