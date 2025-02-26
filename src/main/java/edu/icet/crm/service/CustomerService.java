package edu.icet.crm.service;

import edu.icet.crm.dto.Customer;

import java.util.List;

public interface CustomerService {

    void addCustomer(Customer customer);

    List<Customer> getAll();
}
