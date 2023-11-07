import { Component, ViewChild, ElementRef } from '@angular/core';
import * as paper from 'paper';

const orange = new paper.Color('orange');
const green = new paper.Color('green');
const red = new paper.Color('red');
const white = new paper.Color('white');

@Component({
    selector: 'app-paper-canvas',
    templateUrl: './paper-canvas.component.html',
    styleUrls: ['./paper-canvas.component.css'],
})
export class PaperCanvasComponent {
    @ViewChild('canvasElement') canvasElement: ElementRef<HTMLCanvasElement>;
    public canvas: HTMLCanvasElement;

    ngOninit() { }

    ngAfterViewInit() {
        // Get a reference to the canvas object
        this.canvas = this.canvasElement.nativeElement;
        this.draw();
    }

    draw() {
        // Create an empty project and a view for the canvas
        const project = new paper.Project(this.canvas);

        // circle
        const circle = new paper.Path.Circle({
            center: paper.view.center,
            radius: 50,
            fillColor: orange,
        });
        circle.selected = true;
        circle.selectedColor = green;

        // path
        let path: any = new paper.Path();
        path.strokeColor = 'black';
        let start = new paper.Point(100, 100);
        path.moveTo(start);
        path.lineTo(start.add([200, -50]));
        path.selected = true;

        // Create a rectangle shaped path with its top left point at:
        // {x: 50, y: 25} and a size of {width: 50, height: 50}
        const rect = new paper.Path.Rectangle([50, 25], [50, 50]);
        rect.strokeColor = white;
        project.view.onFrame = function () {
            rect.rotate(3);
        };

        // Draw the view now
        project.view.update();

        // events
        circle.onMouseDown = () => {
            circle.fillColor = red;
        };

        let tool = new paper.Tool();
        tool.onMouseDown = (event) => {
            this.onMouseDown(event);
        };
    }

    onMouseDown(event) {
        console.log(event);
    }
}
