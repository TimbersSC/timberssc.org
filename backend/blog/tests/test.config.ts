import path from 'path';
import fs from 'fs';

export const TEST_USER = {
  FAILING: {
    fid: '40d4e88a-6792-476f-87af-32a156a5e55a',
    scope: '',
  },
  NORMAL: {
    fid: 'd758d0a5-3366-4fd8-96ba-9066659d41c0',
    scope: 'clerk.class clerk.class.readonly',
  },
  // d758d0a5-3366-4fd8-96ba-9066659d41c0 - mpodsiadly@ferant.io
  // 59e243c0-23f4-4362-a1e5-6b7bd76952a0 - Night school
  // 40d4e88a-6792-476f-87af-32a156a5e55a - Tim maine

  '40d4e88a-6792-476f-87af-32a156a5e55a': {
    org: 'MAINE',
    courses: ['0c21a5d6-0dcb-480a-9bda-04bf2347ac5c'],
    accountType: 'Teacher',
  },
  'd758d0a5-3366-4fd8-96ba-9066659d41c0': {
    org: 'FERANT',
    courses: ['0fee5d22-9fa8-4f15-9a30-fb197c96d309'],
    accountType: 'Feranter',
  },
  '59e243c0-23f4-4362-a1e5-6b7bd76952a0': {
    org: 'NIGHT',
    courses: ['0c21a5d6-0dcb-480a-9bda-04bf2347ac5c'],
    accountType: 'Teacher',
  },
  '04bc8fa5-8d20-4f5b-abd0-06fa94eb9516': {
    org: 'HPHS',
    courses: ['0a739ed7-14d2-42b3-98bf-49ac4580a5b7'],
    accountType: 'Admin',
  },
  '8259c844-a14f-42dd-afad-c27920153323': {
    org: 'MAINE',
    courses: ['0c21a5d6-0dcb-480a-9bda-04bf2347ac5c'],
    accountType: 'Teacher',
  },
};

export const fromDir = (startPath: string, filter: string) => {
  //console.log('Starting from dir '+startPath+'/');

  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter); //recurse
    } else if (filename.endsWith(filter)) {
      console.log('-- found: ', filename);
      fs.unlinkSync(filename);
    }
  }
};
