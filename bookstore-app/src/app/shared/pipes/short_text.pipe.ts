import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'short'
})
export class ShortPipe implements PipeTransform{
    transform(value: string): string {
     
        if(value.length <= 250){
            return value;
        }
        return value.substring(0, 250) + "...";
    }

}