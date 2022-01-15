import { Component, OnInit, ViewChild } from '@angular/core';
import { SegmentService } from 'src/app/app-services/segment-service/segment.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-manage-wheel',
  templateUrl: './manage-wheel.component.html',
  styleUrls: ['./manage-wheel.component.css']
})
export class ManageWheelComponent implements OnInit {
  displayedColumns: string[] = ['_id', 'nameWheel','isActive', 'Details', 'Edit', 'Delete'];
  // dataSource: MatTableDataSource<Book>;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private _router: Router, private segmentService: SegmentService) { }
  segments: any
  ngOnInit() {
    this.getSegments();
  }
  getSegments() {
    this.segmentService.getSegments().subscribe(res => {
      this.segments = res as [];
      this.dataSource.data = this.segments;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  deleteSegmentById(seg) {
   if(seg.isActive){
    Swal.fire({
      text: "Phải Có Một Vòng Quay Được Hoạt Động,Nên Hiện Tại Chưa Thể Xóa",
      icon: 'warning',
      showCancelButton: true,  
      confirmButtonText: 'Ok',
    })
   }else{
    Swal.fire({
      text: "Bạn có chắc muốn xóa vòng quay này không?",
      icon: 'warning',
      showCancelButton: true,  
      confirmButtonText: 'Ok',  
      cancelButtonText: 'Cancel'
    })
      .then((willDelete) => {
        if (willDelete) {
          this.segmentService.deleteSegment(seg._id).subscribe(
            data => {
              if(data == 'Successfully deleted'){
                Swal.fire({
                  title: "Đã xóa xong!",
                  text: "Vòng quay này đã được xóa.",
                  icon: 'success'
                });
                this.ngOnInit();
              }else{
                Swal.fire({
                  title: "Có lỗi",
                  text: "Vòng quay này không thể xóa.",
                  icon: 'error'
                });
              }
            })
        }
      });
  }
}
  applyFilter(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getSegmentByID(id: String) {
    return this._router.navigate(["/wheelDetails" + `/${id}`]);
  }
  insertWheel(){
    this._router.navigate(['/insertWheel'])
  }
  updateSegmentById(id: String){
    return this._router.navigate(["/updateWheel" + `/${id}`]);
  }
  checkIsActiveToFalse(id){
    Swal.fire({
      text: "Phải Có Một Vòng Quay Được Hoạt Động",
      icon: 'warning',
      showCancelButton: true,  
      confirmButtonText: 'Ok',  
      
    })
    this.ngOnInit()
  }
// })
  // }
  checkIsActiveToTrue(id){
    console.log(id)
  this.segmentService.updateAToTrue(id).subscribe(res2=>{
    this.ngOnInit()
})
  }
}
