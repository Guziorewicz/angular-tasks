import { inject, signal } from "@angular/core";
import { Task, TaskStatus } from "./tasks/task.model";
import { LoggingService } from "./logging.service";

export class TasksService {

    private randomTasks: Task[] = [
        {
            id: 't1',
            title: 'make project',
            description: 'create project in angular',
            status: 'OPEN'
        },
        {
            id: 't2',
            title: 'set up CI/CD pipeline',
            description: 'Integrate CI/CD for automated deployments',
            status: 'IN_PROGRESS'
        },
        {
            id: 't3',
            title: 'fix bugs',
            description: 'Resolve known bugs in the application',
            status: 'DONE'
        },
        {
            id: 't4',
            title: 'write unit tests',
            description: 'Write unit tests for all components',
            status: 'IN_PROGRESS'
        },
        {
            id: 't5',
            title: 'refactor code',
            description: 'Refactor existing code to improve readability',
            status: 'OPEN'
        },
        {
            id: 't6',
            title: 'review pull request',
            description: 'Review team member\'s pull request',
            status: 'DONE'
        },
        {
            id: 't7',
            title: 'update documentation',
            description: 'Update project documentation and README',
            status: 'IN_PROGRESS'
        },
        {
            id: 't8',
            title: 'set up authentication',
            description: 'Implement OAuth2 for user authentication',
            status: 'OPEN'
        },
        {
            id: 't9',
            title: 'optimize performance',
            description: 'Optimize performance of the web app',
            status: 'IN_PROGRESS'
        },
        {
            id: 't10',
            title: 'design new feature',
            description: 'Design wireframes for the new feature',
            status: 'OPEN'
        },
        {
            id: 't11',
            title: 'create API endpoints',
            description: 'Develop new API endpoints for the backend',
            status: 'DONE'
        },
        {
            id: 't12',
            title: 'test UI components',
            description: 'Perform UI testing on all components',
            status: 'IN_PROGRESS'
        },
        {
            id: 't13',
            title: 'gather feedback',
            description: 'Collect user feedback for the latest release',
            status: 'OPEN'
        },
        {
            id: 't14',
            title: 'update dependencies',
            description: 'Update outdated npm dependencies',
            status: 'DONE'
        },
        {
            id: 't15',
            title: 'perform code review',
            description: 'Conduct a code review of the entire project',
            status: 'IN_PROGRESS'
        }
    ];

    

    private loggingService = inject(LoggingService);
    

    private tasks = signal<Task[]>([]);  
    
    allTasks = this.tasks.asReadonly(); 
    

    loadTasks () {
        this.tasks.update((oldTasks)=> [...oldTasks, ...this.randomTasks]);
    }

    addTask(taskData: {title: string, description: string}) {
        const newTask: Task = {
            ...taskData,
            id: 't' + Math.random().toString(),
            status: 'OPEN'
        };
        this.tasks.update((oldTasks)=> [...oldTasks, newTask]);
        this.loggingService.log('ADDED TASK with title ' + taskData.title);
    }
    
    updateTaskStatus(taskId: string, newStatus: TaskStatus) {
        this.tasks.update((oldTasks) => oldTasks.map(
            (task) => task.id === taskId ? {...task, status: newStatus} : task
        )
    );     
    this.loggingService.log('CHANGED STATUS with title ' + newStatus);
    }
}