import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Paper,
  Grid
} from '@mui/material';
import formConfig from './formConfig.json';

// 根据配置生成验证架构
const generateValidationSchema = (fields) => {
  const schema = {};
  
  fields.forEach(field => {
    let validator;
    
    // 根据字段类型设置正确的验证器
    switch (field.type) {
      case 'email':
        validator = Yup.string().email('请输入有效的邮箱地址');
        break;
      case 'number':
        validator = Yup.number();
        break;
      case 'select':
        validator = Yup.string();
        break;
      default:
        validator = Yup.string();
    }
    
    // 添加通用验证规则
    if (field.required) {
      validator = validator.required(`${field.label}是必填项`);
    }
    
    if (field.minLength) {
      validator = validator.min(field.minLength, `${field.label}最少${field.minLength}个字符`);
    }
    
    if (field.maxLength) {
      validator = validator.max(field.maxLength, `${field.label}最多${field.maxLength}个字符`);
    }
    
    // 数字类型特有的验证
    if (field.type === 'number') {
      if (field.min !== undefined) {
        validator = validator.min(field.min, `${field.label}最小值为${field.min}`);
      }
      if (field.max !== undefined) {
        validator = validator.max(field.max, `${field.label}最大值为${field.max}`);
      }
    }
    
    schema[field.name] = validator;
  });
  
  return Yup.object().shape(schema);
};

const DynamicForm = () => {
  const [searchResults, setSearchResults] = useState(null);
  
  // 生成初始值
  const initialValues = formConfig.fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const validationSchema = generateValidationSchema(formConfig.fields);

  const handleSubmit = (values, { setSubmitting }) => {
    // 模拟提交
    setTimeout(() => {
      setSearchResults(values);
      setSubmitting(false);
    }, 500);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {formConfig.title}
        </Typography>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Grid 
                container 
                spacing={formConfig.layout?.container?.spacing || 2}
              >
                {formConfig.fields.map((field) => (
                  <Grid 
                    item 
                    key={field.name}
                    {...(field.grid || { xs: 12 })}
                  >
                    {field.type === 'select' ? (
                      <TextField
                        select
                        fullWidth
                        name={field.name}
                        label={field.label}
                        value={values[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched[field.name] && Boolean(errors[field.name])}
                        helperText={touched[field.name] && errors[field.name]}
                      >
                        {field.options.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      <TextField
                        fullWidth
                        name={field.name}
                        label={field.label}
                        type={field.type}
                        value={values[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched[field.name] && Boolean(errors[field.name])}
                        helperText={touched[field.name] && errors[field.name]}
                      />
                    )}
                  </Grid>
                ))}
                
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    提交
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>

        {searchResults && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              表单数据：
            </Typography>
            <pre>
              {JSON.stringify(searchResults, null, 2)}
            </pre>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default DynamicForm; 