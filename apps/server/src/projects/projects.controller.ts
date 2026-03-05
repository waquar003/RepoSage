import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { CreateProjectDto } from '@reposage/types';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('project')
@UseGuards(AuthGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    @ResponseMessage('User projects retrieved successfully')
    async getProjects(@GetUser() userId: string) {
        return this.projectsService.getAllUserProjects(userId);
    }

    @Post('create')
    @ResponseMessage('Project created successfully')
    async createProject(@GetUser() userId: string, @Body() dto: CreateProjectDto) {
        return this.projectsService.createProject(userId, dto);
    }

    @Get(':id')
    @ResponseMessage('Project details retrived')
    async getOne(@Param('id') id: string, @GetUser() userId: string) {
        return this.projectsService.getProjectById(id, userId);
    }

    @Patch(':id/archive')
    @ResponseMessage('Project archived successfully')
    async archive(@Param('id') id: string, @GetUser() userId: string) {
        return this.projectsService.archiveProject(id, userId);
    }

    @Delete(':id')
    @HttpCode(204)
    @ResponseMessage('Project permanently deleted')
    async remove(@Param('id') id: string, @GetUser() userId: string) {
        return this.projectsService.deleteProject(id, userId);
    }
}
