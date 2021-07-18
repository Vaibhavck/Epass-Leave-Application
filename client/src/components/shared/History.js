import React from 'react';
import PDFViewver from './PDFViewver';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import fileDownload from 'js-file-download'
import axios from 'axios';
import TabPanel from '../shared/NavTab';
import { TableFooter } from '@material-ui/core';
import moment from 'moment';


export default function History(props) {
  
  var history = props.applicationHistroy;
  var status = props.statusFilter ? 
              ( props.statusFilter === 1 ? "Accepted" : "Rejected" ) : ""
  return (
    <React.Fragment>
      {
        (history && history.length) ?
        <span style={{textAlign: 'center'}}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bolder' }} align="center">Id</TableCell>
                <TableCell style={{ fontWeight: 'bolder' }} align="center">Date Applied</TableCell>
                {/*<TableCell style={{ fontWeight: 'bolder' }} align="center">From (Date)</TableCell>
                <TableCell style={{ fontWeight: 'bolder' }} align="center">To (Date)</TableCell>*/}
                <TableCell style={{ fontWeight: 'bolder' }} align="center">Status</TableCell>
                <TableCell style={{ fontWeight: 'bolder' }} align="right">Application</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { history.map((application) => {
                return (
                <TableRow key={Math.random()}>
                  <TableCell align="center">{application.filename}</TableCell>
                  <TableCell align="center">{moment(application.createdAt).format("YYYY-MM-DD HH:mm")}</TableCell>
                  {/*<TableCell align="center">{application.dateFrom}</TableCell>
                <TableCell align="center">{application.dateTo}</TableCell>*/}
                  <TableCell 
                    style={{
                      color: application.status == null ? "skyblue"  
                              : (
                                application.status === true ? "green" : "red"
                              )
                    }} 
                    align="center">{application.status != null ? (application.status === true ? "accepted" : "rejected") : "under process"}</TableCell>
                  <TableCell align="right">
                    <PDFViewver applicationDetails={application} />
                  </TableCell>
                {/*<TableCell onClick={()=>handleDownload(application.downloadURL, 'sample.docx')} align="right">download</TableCell>*/}
                </TableRow>
              )})}
            </TableBody>
        </Table>
      </span>
       : 
      <Title>No {status} applications</Title>
    }
    </React.Fragment>
  );
}


export function HODApplicationPanel(props) {
  
  var history = props.applicationHistroy;
  var filter = props.filter === 1 ? "Teachers" : "Students"
  return (
    <React.Fragment>
      {
        (history && history.length) ?
        <span style={{textAlign: 'center'}}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bolder' }} align="center">Id</TableCell>
                <TableCell style={{ fontWeight: 'bolder' }} align="center">Date Applied</TableCell>
                {/*<TableCell style={{ fontWeight: 'bolder' }} align="center">From (Date)</TableCell>
                <TableCell style={{ fontWeight: 'bolder' }} align="center">To (Date)</TableCell>*/}
                <TableCell style={{ fontWeight: 'bolder' }} align="center">Status</TableCell>
                <TableCell style={{ fontWeight: 'bolder' }} align="right">Application</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { history.map((application) => {
                return (
                <TableRow key={Math.random()}>
                  <TableCell align="center">{application.filename}</TableCell>
                  <TableCell align="center">{moment(application.createdAt).format("YYYY-MM-DD HH:mm")}</TableCell>
                  {/*<TableCell align="center">{application.dateFrom}</TableCell>
                <TableCell align="center">{application.dateTo}</TableCell>*/}
                  <TableCell 
                    style={{
                      color: application.status == null ? "skyblue"  
                              : (
                                application.status === true ? "green" : "red"
                              )
                    }} 
                    align="center">{application.status != null ? (application.status === true ? "accepted" : "rejected") : "under process"}</TableCell>
                  <TableCell align="right">
                    <PDFViewver applicationDetails={application} />
                  </TableCell>
                {/*<TableCell onClick={()=>handleDownload(application.downloadURL, 'sample.docx')} align="right">download</TableCell>*/}
                </TableRow>
              )})}
            </TableBody>
        </Table>
      </span>
       : 
      <Title>No {filter} applications</Title>
    }
    </React.Fragment>
  );
}