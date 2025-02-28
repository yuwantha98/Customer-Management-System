package edu.icet.crm.service;

import edu.icet.crm.dto.Customer;

import java.util.List;

public interface CustomerService {

    void addCustomer(Customer customer);

    List<Customer> getAll();

    void deleteCustomer(Integer id);

    void updateCustomer(Customer customer);

    Customer searcgById(Integer id);

    List<Customer> searchByName(String name);

    List<Customer> searchByAddress(String address);

}
