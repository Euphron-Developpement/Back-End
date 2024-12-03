import { Controller, Get, Post, Patch, Delete, Param, Body, Query} from '@nestjs/common';
import { TagsService } from './tags.service';
@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Get()
    findAll() {
        return this.tagsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tagsService.findOne(+id);
    }

    @Post()
    create(@Body() tag: { label: string; icon: string ; color: string}) {
        return this.tagsService.create(tag);
    }

    @Patch(':id')
    update(
    @Param('id') id: string,
    @Body() updatedTag: Partial<{ label: string; icon: string; color: string }>,
    ) {
        return this.tagsService.update(+id, updatedTag); // Convertit l'ID en nombre
    }

    @Delete()
    delete(@Query('id') id: string) {
      return this.tagsService.delete(+id);
    }



}
