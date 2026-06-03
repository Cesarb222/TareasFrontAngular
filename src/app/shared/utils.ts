export function mismoDia(date1:Date,date2:Date):boolean{
    return (
        (date1.getFullYear() == date2.getFullYear()) && 
        (date1.getMonth()== date2.getMonth()) && 
        (date1.getDay() == date2.getDay())
    )
}

export function getBase64FomFile(img:any, callback:any){
    let fileReader = new FileReader();
    fileReader.addEventListener('load',function(evt){
        callback(fileReader.result);
    });
    fileReader.readAsDataURL(img);
}