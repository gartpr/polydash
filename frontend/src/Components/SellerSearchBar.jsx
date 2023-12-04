import React, { useState, useEffect } from 'react';
import { Box, Input, Select, Flex, Button } from '@chakra-ui/react';

const SellerSearchBar = ({ onSearch, onClear, selectedSection }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  useEffect(() => {
    handleClearFilter();
  }, [selectedSection]);
  
  const handleSearch = () => {
    const filters = {
      query: searchQuery,
      status: selectedStatus,
      priceRange: selectedPriceRange,
    };
    onSearch(filters, selectedSection);
  };

  const handleClearFilter = () => {
    setSearchQuery('');
    setSelectedStatus('');
    setSelectedPriceRange('');
    onClear();
  };

  return (
    <Box py={4}>
      <Flex justify="space-between" align="center">
        <Input ml={2}
          placeholder="Search by order number or customer name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select ml={2}
          placeholder="Filter by status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="Received">Received</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Preparing">Preparing</option>
          <option value="Ready">Ready</option>
          <option value="Cancelled">Cancelled</option>
        </Select>
        <Select ml={2}
          placeholder="Filter by total price"
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
        >
          <option value="$0-$5">$0 - $5</option>
          <option value="$5-$15">$5 - $15</option>
          <option value="$15-$25">$15 - $25</option>
          <option value="$25+">$25+</option>
        </Select>
        <Button colorScheme="blue" onClick={handleSearch} px={8} ml={2}>
          Search
        </Button>
        <Button colorScheme="gray" onClick={handleClearFilter} px={10} ml={2}>
          Clear Filter
        </Button>
      </Flex>
    </Box>
  );
};

export default SellerSearchBar;
