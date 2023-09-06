<Col sm={12}>
  <Form.Group className="mb-3" controlId="categoryID">
    <Form.Label>{t('category')}</Form.Label>
    <Controller
      control={control}
      name="categoryID"
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Form.Select
          onChange={onChange}
          value={value}
          ref={ref}
          isInvalid={errors.categoryID}
          placeholder={t('category of the agent')}
          type="text"
        >
          <option value="">{t('choice category')}</option>
          {allCategory?.map((category) => (
            <option value={category?.value} key={category?.id}>
              {category?.label}
            </option>
          ))}
        </Form.Select>
      )}
    />
    {errors.categoryID && <Form.Text className="text-danger">{errors.categoryID.message}</Form.Text>}
  </Form.Group>
</Col>;
