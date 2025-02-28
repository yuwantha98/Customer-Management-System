package edu.icet.crm.service.impl;

import edu.icet.crm.dto.Customer;
import edu.icet.crm.entity.CustomerEntity;
import edu.icet.crm.repository.CustomerRepository;
import edu.icet.crm.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    final CustomerRepository customerRepository;
    final ModelMapper mapper;

    @Override
    public void addCustomer(Customer customer) {
        customerRepository.save(mapper.map(customer, CustomerEntity.class)); //customer convert to customerEntity
    }

    @Override
    public List<Customer> getAll() {
        List<Customer> customerList = new ArrayList<>();
        List<CustomerEntity> all = customerRepository.findAll();

        all.forEach(customerEntity -> {
            customerList.add(mapper.map(customerEntity, Customer.class));
        });

        return customerList;
    }

    @Override
    public void deleteCustomer(Integer id) {
        customerRepository.deleteById(id);
    }

    @Override
    public void updateCustomer(Customer customer) {
        customerRepository.save(mapper.map(customer,CustomerEntity.class));
    }

    @Override
    public Customer searcgById(Integer id) {
        return mapper.map(customerRepository.findById(id), Customer.class);
    }

    @Override
    public List<Customer> searchByName(String name) {
        List<CustomerEntity> byName = customerRepository.findByName(name);
        List<Customer> customerList = new ArrayList<>();

        byName.forEach(customerEntity -> {
            customerList.add(mapper.map(customerEntity, Customer.class));
        });

        return customerList;
    }

    @Override
    public List<Customer> searchByAddress(String address) {
        List<CustomerEntity> byAddress = customerRepository.findByAddress(address);
        List<Customer> customerList = new ArrayList<>();

        byAddress.forEach(customerEntity -> {
            customerList.add(mapper.map(customerEntity, Customer.class));
        });

        return customerList;
    }

}
