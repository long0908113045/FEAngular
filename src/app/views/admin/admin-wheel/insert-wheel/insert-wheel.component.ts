import { Component, OnInit } from '@angular/core';

import { SegmentService } from 'src/app/app-services/segment-service/segment.service';
import { Router } from '@angular/router';

import { Segment } from 'src/app/app-services/segment-service/segment.model';
import Swal from 'sweetalert2'
declare var $: any;
declare let Winwheel: any
@Component({
  selector: 'app-insert-wheel',
  templateUrl: './insert-wheel.component.html',
  styleUrls: ['./insert-wheel.component.css']
})
export class InsertWheelComponent implements OnInit {

  constructor(private segmentService: SegmentService, private _router: Router) { }
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
  ngOnInit() {
    this.getWheel()
  }
  itemWheel = []
  arrayWheel = [0, 1, 3, 2, 1, 0, 4, 1, 0, 2, 1, 5]
  arrayFillStyle = ["#eae56f", "#809fff", "#4dff4d", "#99ddff", "#ff80ff", "#ffc299"]
  segmentsList = []
  segmentItem = {}
  getWheel() {
    //0
    this.segmentsList = []
    this.itemWheel = []
    this.segmentItem = { "fillStyle": this.arrayFillStyle[0], "text": this.option0 }
    this.segmentsList.push(this.segmentItem)
    //1
    this.segmentItem = { "fillStyle": this.arrayFillStyle[1], "text": this.option1 }
    this.segmentsList.push(this.segmentItem)
    //2
    this.segmentItem = { "fillStyle": this.arrayFillStyle[2], "text": this.option2 }
    this.segmentsList.push(this.segmentItem)
    //3
    this.segmentItem = { "fillStyle": this.arrayFillStyle[3], "text": this.option3 }
    this.segmentsList.push(this.segmentItem)
    //4
    this.segmentItem = { "fillStyle": this.arrayFillStyle[4], "text": this.option4 }
    this.segmentsList.push(this.segmentItem)
    //5
    this.segmentItem = { "fillStyle": this.arrayFillStyle[5], "text": this.option5 }
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
    console.log(theWheel)
    $("#canvas").hide();
    $("#canvas").show();
    theWheel.draw();

  }

  //controll
  InputOption0(event) {

    if (this.valueselect0 == "discount") {
      this.option0 = "Mã Giảm Giá " + event.target.value + "%";
    }
    if (this.valueselect0 == "point") {
      this.option0 = "+" + event.target.value + " Điểm";
    }
    this.getWheel()
  }
  InputOption1(event) {

    if (this.valueselect1 == "discount") {
      this.option1 = "Mã Giảm Giá " + event.target.value + "%";
    }
    if (this.valueselect1 == "point") {
      this.option1 = "+" + event.target.value + " Điểm";
    }
    this.getWheel()
  }
  InputOption2(event) {

    if (this.valueselect2 == "discount") {
      this.option2 = "Mã Giảm Giá " + event.target.value + "%";
    }
    if (this.valueselect2 == "point") {
      this.option2 = "+" + event.target.value + " Điểm";
    }
    this.getWheel()
  }
  InputOption3(event) {

    if (this.valueselect3 == "discount") {
      this.option3 = "Mã Giảm Giá " + event.target.value + "%";
    }
    if (this.valueselect3 == "point") {
      this.option3 = "+" + event.target.value + " Điểm";
    }
    this.getWheel()

  }
  InputOption4(event) {

    if (this.valueselect4 == "discount") {
      this.option4 = "Mã Giảm Giá " + event.target.value + "%";
    }
    if (this.valueselect4 == "point") {
      this.option4 = "+" + event.target.value + " Điểm";
    }
    this.getWheel()

  }
  InputOption5(event) {

    if (this.valueselect5 == "discount") {
      this.option5 = "Mã Giảm Giá " + event.target.value + "%";
    }
    if (this.valueselect5 == "point") {
      this.option5 = "+" + event.target.value + " Điểm";
    }
    this.getWheel()
  }


  //select option
  select0(event) {
    this.valueselect0 = event.target.value
    if (this.valueselect0 == "nope") {
      this.option0 = "Không Có Quà";
      this.getWheel()
    }
  }
  select1(event) {
    this.valueselect1 = event.target.value
    if (this.valueselect1 == "nope") {
      this.option1 = "Không Có Quà";
      this.getWheel()
    }
  }
  select2(event) {
    this.valueselect2 = event.target.value
    if (this.valueselect2 == "nope") {
      this.option2 = "Không Có Quà";
      this.getWheel()
    }
  }
  select3(event) {
    this.valueselect3 = event.target.value
    if (this.valueselect3 == "nope") {
      this.option3 = "Không Có Quà";
      this.getWheel()
    }
  }
  select4(event) {
    this.valueselect4 = event.target.value
    if (this.valueselect4 == "nope") {
      this.option4 = "Không Có Quà";
      this.getWheel()
    }
  }
  select5(event) {
    this.valueselect5 = event.target.value
    if (this.valueselect5 == "nope") {
      this.option5 = "Không Có Quà";
      this.getWheel()
    }
  }

  nameWheel = ""
  isActive = false
  ClickActive(event) {
    this.isActive = event.target.value
  }
  InputNameWheel(event) {
    this.nameWheel = event.target.value
  }
  checkSubmit() {

    if (this.nameWheel == "" || this.option0 == "" || this.option1 == "" || this.option2 == "" || this.option3 == "" || this.option4 == "" || this.option5 == "") {
      return false
    }
    return true

  }
  insertWheel() {
    if (this.checkSubmit() == true) {
      var seg = {
        nameWheel: this.nameWheel,
        option0: this.option0,
        option1: this.option1,
        option2: this.option2,
        option3: this.option3,
        option4: this.option4,
        option5: this.option5,
        isActive: this.isActive,

      }
      //kiemr tra check
      if (this.isActive) {
        this.segmentService.checkActiveExistTrue().subscribe(res => {
          if (res == true) {
            Swal.fire({
              title: "Chỉ Được Phép Một Vòng Quay Duy Nhất Hoạt Động\n Vòng Quay Đang Hoạt Động Sẽ Tắt \n Và Được Thay Bởi Vòng Quay Này",
              icon: 'warning',  
              showCancelButton: true,  
              confirmButtonText: 'Ok',  
              
            }).then((willChange) => {
              if (willChange) {
                //Cập nhật status
                this.segmentService.updateAllActiveToFalse().subscribe(res=>{
                    this.Insert(seg)
                })
            
              }
            })
          }else{
            this.Insert(seg)
          }
        })
      } else {
        console.log("123")
        this.Insert(seg)
      }
    } else {
      Swal.fire({
        title: "Bạn Phải Điền Đầy Đủ Các Trường Để Hoàn Thiện Vòng Quay",
        icon: 'warning',   
      showCancelButton: true,  
      confirmButtonText: 'Ok',  
      
      })

    }

  }
  //
  Insert(seg){
    this.segmentService.postSegment(seg).subscribe(
      data => {
        Swal.fire({
          text: "Thêm vòng quay thành công",
          icon: 'success',
          showCancelButton: true,  
      confirmButtonText: 'Ok',
        })
        this._router.navigate(['/manageWheel']);
        this.statusInsert = true;
      },
      error => console.log(error)
    );
  }

  cancel() {
    this._router.navigate(['/manageWheel'])
  }
}
