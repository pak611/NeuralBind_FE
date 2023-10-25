from django.core.management.base import BaseCommand
from ...models import DockingProgress  # Adjust the import path as needed

class Command(BaseCommand):
    help = 'Updates docking progress for a task'

    def add_arguments(self, parser):
        parser.add_argument('task_id', type=str, help='Unique task ID for progress tracking')

    def handle(self, *args, **kwargs):
        task_id = kwargs['task_id']
        progress = DockingProgress.objects.get(task_id=task_id)
        progress.ligands_docked += 1
        progress.save()
        self.stdout.write(self.style.SUCCESS(f'Updated progress for task {task_id}'))
