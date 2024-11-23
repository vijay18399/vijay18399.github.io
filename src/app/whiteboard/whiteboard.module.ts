import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiteboardRoutingModule } from './whiteboard-routing.module';
import { HeaderComponent } from '../shared/components/header.component';
import { LoaderComponent } from '../shared/components/loader.component';
import { WhiteboardComponent } from './whiteboard.component';
import { SharedModule } from '../shared/shared.module';
import { ColorsComponent } from './components/colors.component';
import { ContainerComponent } from './components/container.component';
import { FabricCanvasComponent } from './components/fabric-canvas.component';
import { FormsModule } from '@angular/forms';
import { ToolBarComponent } from './components/tool-bar.component';



@NgModule({
  declarations: [
    FabricCanvasComponent,
    WhiteboardComponent,
    ContainerComponent,
    ColorsComponent,
    ToolBarComponent
  ],
    imports: [
      LoaderComponent,
      HeaderComponent,
      CommonModule,
      FormsModule,
      SharedModule,
      WhiteboardRoutingModule
  ]
})
export class WhiteboardModule { }

