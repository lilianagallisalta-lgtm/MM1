import { NgModule } from '@angular/core';
import {SafeUrlPipe} from "./safeUrl";
import {ForPipe} from "./for";
import {UcFirstPipe} from "./ucfirst";
import {RoundPipe} from "./round";
import {TruncatePipe} from "./truncate";
import {SelectPipe} from "./select.pipe";

const SHARED_PIPES = [
  TruncatePipe,
  UcFirstPipe,
  SafeUrlPipe,
  RoundPipe,
  ForPipe,
  SelectPipe,
];

@NgModule({
	declarations: SHARED_PIPES,
	imports: [],
	exports: SHARED_PIPES,
})
export class PipesModule {}
