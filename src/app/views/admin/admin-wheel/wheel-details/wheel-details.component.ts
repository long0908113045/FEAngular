import { Component, OnInit } from '@angular/core';

import { SegmentService } from 'src/app/app-services/segment-service/segment.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Segment } from 'src/app/app-services/segment-service/segment.model';
import Swal from 'sweetalert2'
declare var $: any;
declare let Winwheel: any
@Component({
  selector: 'app-wheel-details',
  templateUrl: './wheel-details.component.html',
  styleUrls: ['./wheel-details.component.css']
})
export class WheelDetailsComponent implements OnInit {

  constructor(private segmentService: SegmentService,private route: ActivatedRoute, private _router: Router) { }
  //value option
  option0 = ""
  option1 = ""
  option2 = ""
  option3 = ""
  option4 = ""
  option5 = ""
  //value chọn
  valueselect0 = "point"
  valueselect1 = "point"
  valueselect2 = "point"
  valueselect3 = "point"
  valueselect4 = "point"
  valueselect5 = "point"
  statusInsert = false
  id = this.route.snapshot.paramMap.get('id');
  ngOnInit() {
    this.getWheel()
    this.getByID()
  
  }
  //get by id
  getByID(){
    this.segmentService.getSegmentsByID(this.id).subscribe(req=>{
      if(req["isActive"])
      this.isActive = "Đang kích hoạt"
      else  this.isActive = "Chưa kích hoạt"

      this.nameWheel= req["nameWheel"]
      this.option0 = req["segments"][0]
      this.option1 =req["segments"][1]
      this.option2 = req["segments"][2]
      this.option3 =req["segments"][3]
      this.option4 =req["segments"][4]
      this.option5=req["segments"][5]
      console.log(this.option5)
      this.getWheel()

    })
  }
  itemWheel = []
  arrayWheel = [0, 1, 3, 2, 1, 0, 4, 1, 0, 2, 1, 5]
  arrayFillStyle = ["#eae56f", "#809fff", "#4dff4d", "#99ddff", "#ff80ff", "#ffc299"]
  arrayFillStyle2 = ["#eae56f", "#809fff", "#4dff4d", "#99ddff", "#ff80ff", "#ffc299"]
  segmentsList = []
  segmentItem = {}
  getWheel() {
    //0
    this.segmentsList = []
    this.itemWheel = []
    this.segmentItem = this.option0 
    this.segmentsList.push(this.segmentItem)
    //1
    this.segmentItem =  this.option1 
    this.segmentsList.push(this.segmentItem)
    //2
    this.segmentItem =  this.option2 
    this.segmentsList.push(this.segmentItem)
    //3
    this.segmentItem =  this.option3 
    this.segmentsList.push(this.segmentItem)
    //4
    this.segmentItem = this.option4 
    this.segmentsList.push(this.segmentItem)
    //5
    this.segmentItem = this.option5 
    this.segmentsList.push(this.segmentItem)

    for (let index of this.arrayWheel) {
      this.itemWheel.push(this.segmentsList[index])

    }
    this.designWheel();
  }
  designWheel() {
    //Thông số vòng quay

    let theWheel = new Winwheel({
      'numSegments': 12,     // Chia 12 phần bằng nhau
      'outerRadius': 152,   // Đặt bán kính vòng quay
      'textFontSize': 14,    // Đặt kích thước chữ
      'rotationAngle': 0,     // Đặt góc vòng quay từ 0 đến 360 độ.
      'segments': this.itemWheel,    // Các thành phần bao gồm màu sắc và văn bản.
      'pins':
      {
        'number': 32   //Số lượng chân. Chia đều xung quanh vòng quay.
      }
    });
  
    $("#canvas").hide();
    $("#canvas").show();
    theWheel.draw();

  }

  


 

  nameWheel = ""
  isActive = ""

  
  

  cancel() {
    this._router.navigate(['/manageWheel'])
  }
  gotoUpdate(){
    return this._router.navigate(["/updateWheel" + `/${this.id}`]);
  }
}
